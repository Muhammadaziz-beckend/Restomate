from django.contrib import admin
from django.contrib.admin import ModelAdmin

from .models import *

@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    
    list_display = (
        "id",
        "name",
    )

    list_display_links = (
        "name",
    )

    search_fields = (
        "name",
    )


@admin.register(Dish)
class DishAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "prise",
        "update_dt",
        "create_dt"
    )

    list_display_links = (
        "id",
        "name",
        "prise",
    )

    list_filter = (
        "create_dt",
        "category",
    )