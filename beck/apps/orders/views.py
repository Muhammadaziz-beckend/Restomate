from rest_framework.permissions import IsAdminUser, IsAuthenticated,AllowAny
from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from utils.mixins import UltraModelViewSet
from utils.permissions import IsOwnerOrAdmin
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
        "list": [AllowAny], #AllowAny IsAuthenticated
        "retrieve": [IsAuthenticated], 
        "create": [IsAuthenticated, IsAdminUser],
        "update": [IsAuthenticated, IsAdminUser],
        "destroy": [IsAuthenticated, IsAdminUser],
    }
