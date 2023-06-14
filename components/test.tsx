"use client"
import { useState } from "react"

// test set count button 

export default function Test() {
    const [count, setCount] = useState(0)
    
    return (
        <>
        <button onClick={() => setCount(count + 1)}> {count} </button>
        </>
    )
}