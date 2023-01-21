import { useState } from "react";

export const useToggle = (initial = false) => {
    const [isToggle, setIsToggle] = useState(initial)
    const makeToggle = () => {
        setIsToggle(!isToggle)
    }
    return [isToggle, makeToggle]
}