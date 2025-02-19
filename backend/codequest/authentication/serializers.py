from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'points')
        extra_kwargs = {
            'password': {'write_only': True},
            'points': {'default': 0}  # Set default points
        }

    def create(self, validated_data):
        # Explicitly set points if not provided
        if 'points' not in validated_data:
            validated_data['points'] = 0
            
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            points=validated_data.get('points', 0)
        )
        return user