from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from utils.mixins import UltraModelViewSet
from utils.permissions import IsOwnerOrAdmin
from .serializers import *
from .models import *


class DishModelViewsSet(UltraModelViewSet):
    queryset = Dish.objects.all()
    lookup_field = "id"
    filter_backends = [
        SearchFilter,
        DjangoFilterBackend,
        OrderingFilter,
    ]
    search_fields = [
        "name",
        "descriptions",
    ]
    ordering = [
        "prise",
        "create_dt",
        "update_dt",
    ]
    serializer_classes = {
        "list": ListDishSerializer,
        "retrieve": ListDishSerializer,
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

class Category(UltraModelViewSet):
    queryset = Category.objects.all()
    lookup_field = "id"
    serializer_class = CategorySerializer
    permission_classes = [IsOwnerOrAdmin]