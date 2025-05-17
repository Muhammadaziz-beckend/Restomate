from rest_framework import serializers

from .models import Table


class ListTableSerializers(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = (
            "id",
            "number",
            "seats",
            "is_occupied",
        )


class CreateTableSerializer(serializers.ModelSerializer):

    class Meta:
        model = Table
        fields = (
            "number",
            "seats",
        )
