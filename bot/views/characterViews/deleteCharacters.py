from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from ..get_post import get_post
from haven.models import Character
@csrf_exempt
def delete_characters(request):
  data = get_post(request)
  id_list = data['ids']
  disconnect = data['disconnect']
  names = []
  
  for id in id_list:
    char = Character.objects.get(pk=int(id))
    names.append(char.name)
    
    if disconnect:
      char.chronicle = None
      char.save()
    else:
      member = char.member
      char.delete()
      
      if (member):
        chars = member.character_set.all()
        if not chars and not member.user.registered:
          # Only deletes the member if no characters and is not
          # registered.
          char.member.delete()
  
  return JsonResponse({'names': names})