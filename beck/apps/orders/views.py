from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from drf_yasg.utils import swagger_auto_schema
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models.query import QuerySet

from utils.mixins import UltraModelViewSet
from utils.paginations import PaginatorClass
from utils.permissions import IsOwnerOrAdmin
from .filters import OrderFilter
from apps.menu.models import Dish
from .serializers import *
from .models import *


class TableModelViewSet(UltraModelViewSet):
    queryset = Table.objects.all()
    lookup_field = "id"
    filter_backends = [OrderingFilter]
    ordering = [
        "number",
        "seats",
        "is_occupied",
    ]
    serializer_class = ListTableSerializers
    serializer_classes = {
        "list": ListTableSerializers,
        "retrieve": ListTableSerializers,
        "update": CreateTableSerializer,
        "create": CreateTableSerializer,
    }
    permission_classes_by_action = {
        "list": [IsAuthenticated],  # AllowAny IsAuthenticated
        "retrieve": [IsAuthenticated],
        "create": [IsAuthenticated, IsAdminUser],
        "update": [IsAuthenticated, IsAdminUser],
        "destroy": [IsAuthenticated, IsAdminUser],
    }


class OrderModelViewSet(UltraModelViewSet):
    queryset = Order.objects.all()
    lookup_field = "id"
    filter_backends = [
        OrderingFilter,
        DjangoFilterBackend,
    ]
    ordering = ["is_paid"]
    serializer_class = ListOrderSerializer
    filterset_class = OrderFilter
    serializer_classes = {
        "list": ListOrderSerializer,
        "retrieve": RetrieveOrderSerializer,
        "update": CreateOrderSerializer,
        "create": CreateOrderSerializer,
    }
    permission_classes_by_action = {
        "list": [IsAuthenticated],  # AllowAny IsAuthenticated
        "retrieve": [IsAuthenticated],
        "create": [IsAuthenticated],
        "update": [IsAuthenticated, IsOwnerOrAdmin],
        "destroy": [IsAuthenticated, IsOwnerOrAdmin],
    }

    def get_queryset(self):
        assert self.queryset is not None, (
            "'%s' should either include a `queryset` attribute, "
            "or override the `get_queryset()` method." % self.__class__.__name__
        )

        user = self.request.user

        queryset = self.queryset
        if isinstance(queryset, QuerySet):

            if user.is_superuser:
                queryset = queryset.all()
            else:
                queryset = queryset.filter(user=user)
        return queryset


class UpdateOrderItem(GenericAPIView):
    queryset = Order.objects.all()
    lookup_field = "id"
    permission_classes = [IsAuthenticated]  # AllowAny IsAuthenticated

    @swagger_auto_schema(
        # methods=["PATH"],
        request_body=EditCountOrderItem,
        responses={201: EditCountOrderItem},
        operation_summary="Обновить количество блюда, 0 — удалить из заказа.",
        operation_description="Обновляет количество блюда в заказе. Требуется ID заказа и ID блюда в заказе.",
    )
    def patch(self, request, order_id, items_id, *args, **kwargs):
        order = self.get_queryset().filter(pk=order_id).first()
        if not order:
            return Response(
                {"error": "Нет такого ID заказа"},
                status=status.HTTP_404_NOT_FOUND,
            )

        item = order.items.filter(pk=items_id).first()
        if not item:
            return Response(
                {"error": "Нет такого ID блюда в заказе"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if not (request.user == order.user or request.user.is_superuser):
            return Response(
                {"error": "У вас нет прав для редактирования"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = EditCountOrderItem(data=request.data)
        if serializer.is_valid():
            count = serializer.validated_data["count"]
            if count > 0:
                item.count = count
                item.save()
                return Response(
                    {"success": "Количество обновлено!"},
                )
            else:
                item.delete()
                return Response(
                    {"success": "Блюдо из заказа удалён"},
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(
        request_body=EditCountOrderItem,
        responses={201: EditCountOrderItem},
        operation_summary="Добавления блюдо на заказ. items_id - id блюдо",
        operation_description="Добавления блюдо на заказ. Требуется ID заказа и ID блюда в заказе.",
    )
    def post(self, request, order_id, items_id, *args, **kwargs):
        order = self.get_queryset().filter(pk=order_id).first()

        if not order:
            return Response(
                {"error": "Нет такого ID заказа"},
                status=status.HTTP_404_NOT_FOUND,
            )

        dish = Dish.objects.filter(id=items_id).first()
        if not dish:
            return Response(
                {"error": "Такова блюдо нету!"},
                status=status.HTTP_404_NOT_FOUND,
            )

        order_item = order.items.filter(dish=dish).first()
        if order_item:
            order_item.count += 1
            order_item.save()
            return Response(
                {"success": f"1шт добавлен {order_item.dish.name}"},
                status=status.HTTP_200_OK,
            )

        if not (request.user == order.user or request.user.is_superuser):
            return Response(
                {"error": "У вас нет прав для редактирования"},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = EditCountOrderItem(data=request.data)
        if serializer.is_valid():
            count = serializer.validated_data["count"]
            if count > 0:
                OrderItems.objects.create(order=order, dish=dish)

                return Response(
                    {"success": "Блюдо добавлено"},
                    status=status.HTTP_201_CREATED,
                )

            return Response(
                {"error": "Количество должно быть больше 0"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return


# class AdminOrderViewSet(UltraModelViewSet):
#     queryset = Order.objects.all()
#     lookup_field = "id"
#     filter_backends = [
#         OrderingFilter,
#         DjangoFilterBackend,
#     ]
#     ordering = ["-create_dt"]
#     serializer_class = ListOrderSerializer
#     filterset_class = OrderFilter
#     serializer_classes = {
#         "list": ListOrderSerializer,
#         "retrieve": RetrieveOrderSerializer,
#         "update": CreateOrderSerializer,
#         "create": CreateOrderSerializer,
#     }
#     permission_classes_by_action = {
#         "list": [IsAuthenticated, IsAdminUser],
#         "retrieve": [IsAuthenticated, IsAdminUser],
#         "create": [IsAuthenticated, IsAdminUser],
#         "update": [IsAuthenticated, IsAdminUser],
#         "destroy": [IsAuthenticated, IsAdminUser],
#     }
#     pagination_class = PaginatorClass