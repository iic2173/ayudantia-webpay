# Integracion WebPay

## Flujo 

![](https://i.imgur.com/LSBCa4Y.png)

Donde **UI** es nuestro frontend y **API** nuestra API.

## Integracion paso a paso

### Primer paso - Solicitud de Compra

> [Documentacion de WebPay para crear una transaccion](https://www.transbankdevelopers.cl/documentacion/webpay-plus?#crear-una-transaccion)

UI debe poder enviar un POST a la API con la intencion del usuario de realizar una compra. La API debera enviar esta [solicitud de compra](https://www.transbankdevelopers.cl/documentacion/webpay-plus#crear-una-transaccion) a webpay. La realizacion de compra dependera del lenguaje utilizado. 

### Segundo paso - Confirmacion de compra

Backend recibira de la solicitud de compra un token y una URL de la siguiente manera

```json
{
  "token": <string>,
  "url": <string>
}
```

Este token y URL deben ser enviados al *Frontend* de forma que el usuario pueda confirmar la compra. Para esto, la documentacion de Webpay recomienda el uso de el tag `<form>` de HTML, junto a un `<input type="hidden">` para enviar el token. Tal que quede de la siguiente manera

```html
<form action={url} method="POST">
  <input type="hidden" value={token} name="token_ws" />
  ....
</form>
```

### Tercer paso - WebPay y estado de transaccion

Al confirmar la compra, usuario sera redirigido a Webpay. Una vez terminada la transaccion, se redirigira a la URL especificada al momento de crear la transaccion. Junto al redireccionamiento, se incluira un query param `token_ws` con el valor del token de la transaccion. Si este **token no esta presente**, significa que el **usuario anulo la compra**. 

Si el token esta presente, este debe ser enviado a la API para realizar la confirmacion de la transaccion.

### Cuarto paso - Confirmacion de transaccion

> [Documentacion de WebPay para confirmar una transaccion](https://www.transbankdevelopers.cl/documentacion/webpay-plus?#confirmar-una-transaccion)

Fronend realiza una request POST a la API con el `token_ws` para poder realizar la confirmacion de la transaccion con WebPay. La API ejecuta la funcion necesaria para verificar la compra. Se recibe informacion de la transaccion donde lo que mas importa es el `response_code`. Si este es `0` la transaccion fue exitosa, de lo contrario, la transaccion fue rechazada. Puedes ver el significado de los codigos de respuesta en la [documentacion](https://www.transbankdevelopers.cl/producto/webpay#codigos-de-respuesta-de-autorizacion)

Una vez confirmada la transaccion se debe avisar a la pagina web para mostrarle al usuario el estado final de la transaccion (aceptada o rechazada)




