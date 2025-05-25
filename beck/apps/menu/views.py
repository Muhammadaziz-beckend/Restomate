from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q

from utils.mixins import UltraModelViewSet
from utils.permissions import IsOwnerOrAdmin
from .filters import DishFilter
from .serializers import *
from .models import *


class DishModelViewsSet(UltraModelViewSet):
    queryset = Dish.objects.all()
    lookup_field = "id"
    filter_backends = [
        # SearchFilter,
        DjangoFilterBackend,
        OrderingFilter,
    ]
    # search_fields = ["^name", "=descriptions"]
    ordering = [
        "prise",
        "create_dt",
        "update_dt",
    ]
    filterset_class = DishFilter
    serializer_class = ListDishSerializer
    serializer_classes = {
        "list": ListDishSerializer,
        "retrieve": RetrieveDishSerializer,
        "update": CreateDishSerializer,
        "create": CreateDishSerializer,
    }
    permission_classes_by_action = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "create": [IsAuthenticated],
        "update": [IsAuthenticated, IsOwnerOrAdmin],
        "destroy": [IsAuthenticated, IsOwnerOrAdmin],
    }

    def get_queryset(self):
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search')

        if search_query:
            queryset = queryset.filter(
                Q(name__icontains=search_query) |
                Q(descriptions__icontains=search_query)
            )

        return queryset


class Category(UltraModelViewSet):
    queryset = Category.objects.all()
    lookup_field = "id"
    serializer_class = CategorySerializer
    permission_classes_by_action = {
        "list": [IsAuthenticated],
        "retrieve": [IsAuthenticated],
        "create": [IsAdminUser],
        "update": [IsAuthenticated, IsAdminUser],
        "destroy": [IsAuthenticated, IsAdminUser],
    }
