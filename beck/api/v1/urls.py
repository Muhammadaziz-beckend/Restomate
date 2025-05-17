from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.orders.views import TableModelViewSet

from .ysge import swagger
from apps.menu.views import *

router = DefaultRouter()
router.register("tables",TableModelViewSet)
router.register("dishes",DishModelViewsSet)
router.register("category",Category)

urlpatterns = [
    #
    path("", include(router.urls)),
]

urlpatterns += swagger
