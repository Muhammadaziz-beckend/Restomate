from django_filters import rest_framework as filters

from .models import Dish


class DishFilter(filters.FilterSet):
    
    class Meta:
        model = Dish
        fields = (
            "category",
        )