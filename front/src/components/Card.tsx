import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { buyTicket } from "../api/tickets";
import { useNavigate } from "react-router-dom";


type CardProps = {
    id: string;
    title: string;
    description: string;
    type: string;
    price: number;
}

function Card({title, description, id, price, type}: CardProps) {
    const navigate = useNavigate()
    const [amount, setAmount] = useState(1)

    const { isLoading, mutate, data } = useMutation({
        mutationKey: ["buy", id],
        mutationFn: () => buyTicket({
            ticketId: id,
            quantity: amount,
        }),
    })

    function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value === "" || Number(event.target.value) < 0 || isNaN(Number(event.target.value))) {
            setAmount(0)
            return
        }
        setAmount(Number(event.target.value))
    }

    function handleBuy(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault()

        mutate()
    }

    if (data?.url && data?.token) {
        navigate(`/confirm-purchase`, {
            state: {
                url: data.url,
                token: data.token,
                amount,
                title,
                type,
                price,
            }
        })
    }

    // filter words with starting # in description and separate them from the description
    const descriptionWords = description.split(" ")
    const descriptionWithoutHashtags = descriptionWords.filter(word => !word.startsWith("#")).join(" ") + " "
    const hashtags = descriptionWords.filter(word => word.startsWith("#")).join(" ")

    return (
        <div className="flex flex-col rounded-xl shadow-[0_0px_8px_#b4b4b4] text-black p-6 gap-2 justify-around">
            <div className="flex gap-5 items-end">
                <h2 className="text-2xl font-bold">{title}</h2>
                <h3 className="text-slate-600 italic">{type}</h3>
            </div>
            
            <p>{descriptionWithoutHashtags}<span className="text-sky-500 font-semibold">{hashtags}</span></p>
            <h4>Precio: ${price}</h4>
            <div className="flex justify-between items-end gap-5">
                <label htmlFor="amount" className="w-1/3">Amount
                <input type="text" placeholder="Enter Amount" onChange={handleAmountChange} value={amount} className="border px-5 py-2 rounded w-full text-center"/>
                </label>
                
                <button className="bg-sky-500 text-white rounded px-5 py-2 w-full" disabled={isLoading || amount <= 0} onClick={handleBuy}>buy</button>
            </div>
        </div>
    )
}


export default Card;