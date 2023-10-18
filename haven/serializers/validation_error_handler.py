from rest_framework.response import Response
from rest_framework import serializers, status


def validation_error_handler(errors):
  error = errors.get('name', None)
  if error is not None and len(error): error = error[0]
  else: 
    print(errors)
    Response(status=status.HTTP_400_BAD_REQUEST)

  if getattr(error, 'code', 'invalid') != 'invalid':
    return Response(error, status=error.code)

  return Response(error, status=status.HTTP_400_BAD_REQUEST)
