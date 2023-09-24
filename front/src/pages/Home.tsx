import { useQuery } from "@tanstack/react-query"
import { getTickets } from "../api/tickets"
import Card from "../components/Card"

type Ticket = {
  id: string;
  name: string;
  description: string;
  type: string;
  price: number;
}

function Home() {

  const {data, isLoading} = useQuery({
    queryKey: ['home'],
    queryFn: () => getTickets()
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  console.log(data)

  return (
    <div className="p-20">
      <p className="text-6xl text-center font-extrabold text-sky-500">HOME</p>
      <div className="grid grid-cols-2 mt-5 gap-5">
        {data.tickets.map((ticket: Ticket) => (
          <Card key={ticket.id} id={ticket.id} title={ticket.name} description={ticket.description} price={ticket.price} type={ticket.type} />
        ))}
      </div>
    </div>
  )
}

export default Home