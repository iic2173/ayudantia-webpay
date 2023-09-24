
type State = {
  url: string;
  token: string;
  amount: number;
  title: string;
  price: number;
  type: string;
}

function ConfirmPurchase() {

  const {usr: data}: {usr: State} = history.state

  console.log(data)
  return (
    <div className="p-20">
      <p className="text-6xl text-center font-extrabold text-sky-500">Confirmar compra</p>
      <form className="flex flex-col gap-5 border rounded-xl shadow-[0_0px_8px_#b4b4b4] p-6 mt-5" action={data.url} method="POST">
        <input type="hidden" name="token_ws" value={data.token} />
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold">{data.title}</p> 
          <p>Tipo: {data.type}</p>
          <p>Cantidad: {data.amount}</p>
        </div>
        <button className="bg-sky-500 text-white rounded px-5 py-2" type="submit">Pagar ${data.price * data.amount}</button>
      </form>
    </div>
  )
}

export default ConfirmPurchase