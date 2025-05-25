from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):
    
    def has_object_permission(self, request, view, obj):
                
        return obj.user == request.user or request.user.is_superuser
    
    def has_permission(self, request, view):
        return request.user.is_superuser