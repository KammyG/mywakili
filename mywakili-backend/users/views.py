from rest_framework import generics, permissions
from .serializers import RegisterSerializer
from .models import User
from rest_framework.permissions import AllowAny
from .serializers import ProfileSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user    
