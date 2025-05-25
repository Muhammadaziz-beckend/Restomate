from rest_framework import serializers

from apps.menu.serializers import DishInOrderSerializer

from .models import *


class ListTableSerializers(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = (
            "id",
            "number",
            "seats",
            "is_occupied",
        )


class EditCountOrderItem(serializers.Serializer):
    count = serializers.IntegerField(min_value=0, help_text="Новое количество блюда")


# class CreateCountOrderItem(serializers.)


class CreateTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = (
            "number",
            "seats",
        )


class OrderItemSerializer(serializers.ModelSerializer):
    dish = DishInOrderSerializer()

    class Meta:
        model = OrderItems
        fields = (
            "id",
            "dish",
            "count",
            "total_prise",
        )


class ListOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "table",
            "status",
            "total_prise",
            "is_paid",
            "items",
            "update_dt",
            "create_dt",
        )


class RetrieveOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            "id",
            "table",
            "status",
            "total_prise",
            "is_paid",
            "update_dt",
            "create_dt",
        )


class CreateOrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = (
            "table",
            "status",
            "total_prise",
            "is_paid",
        )

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            validated_data["user"] = request.user
        return Order.objects.create(**validated_data)
