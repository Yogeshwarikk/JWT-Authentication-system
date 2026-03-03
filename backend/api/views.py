from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# REGISTER
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and Password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=400)

    User.objects.create_user(username=username, password=password)

    return Response({"message": "User Registered Successfully"}, status=201)


# LOGIN
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)

    if user is not None:
        return Response({"message": "Login Successful"}, status=200)
    else:
        return Response({"error": "Invalid Credentials"}, status=400)