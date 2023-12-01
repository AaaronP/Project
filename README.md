# Firebase

> Actualiza el archivo `/firebase.js` con tu apikey de firebase

### Y utiliza estas reglas

En el apartado de reglas de firestore

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{user} {
      allow read: if isLogged();
      allow create: if user == request.resource.data.email && isLogged();
      allow delete: if isLogged();
      allow update: if isLogged();
    }
    
    function isLogged(){
    	return request.auth != null;
    }
    
    match /dispositivos/{dispositivo} {
      allow read: if isLogged();
      allow create: if isLogged() && (request.resource.data.id != null && request.resource.data.id != "");
      allow delete: if isLogged();
      allow update: if isLogged();
    }
  }
}
```
