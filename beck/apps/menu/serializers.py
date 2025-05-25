from rest_framework import serializers

from .models import *


class ListDishSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dish
        fields = (
            "id",
            "image",
            "name",
            "prise",
            "category",
        )

class DishInOrderSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Dish
        fields = (
            "id",
            "name",
            "prise",
        )

class RetrieveDishSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dish
        fields = (
            "id",
            "image",
            "name",
            "prise",
            "category",
            "descriptions",
        )


class CreateDishSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dish
        fields = (
            "image",
            "name",
            "prise",
            "category",
            "descriptions",
        )


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = (
            "id",
            "name",
        )
        