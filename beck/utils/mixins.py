from rest_framework.viewsets import ModelViewSet


class SerializeByActionMixin:
    serializer_classes = {}

    def get_serializer_class(self):
        if self.action in ["partial_update", "update_partial"]:
            return self.serializer_classes.get("update", super().get_serializer_class())
        return self.serializer_classes.get(self.action, super().get_serializer_class())


class PermissionByActionMixin:
    permission_classes_by_action = {}

    def get_permissions(self):
        if self.action in ["partial_update", "update_partial"]:
            permission_classes = self.permission_classes_by_action.get(
                "update", self.permission_classes
            )
        else:
            permission_classes = self.permission_classes_by_action.get(
                self.action, self.permission_classes
            )
        return [permission() for permission in permission_classes]


class UltraModelViewSet(
    PermissionByActionMixin,
    SerializeByActionMixin,
    ModelViewSet,
): ...
