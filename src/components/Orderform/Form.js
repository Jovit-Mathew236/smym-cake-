import React, { useContext, useState } from 'react'
import './Form.css'
import { FirebaseContext } from '../../store/Contexts'
import { useHistory } from 'react-router-dom'

function Form() {
    const { firebase } = useContext(FirebaseContext)
    const history = useHistory()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [house, setHouse] = useState('')
    const [section, setSection] = useState('')
    const [address, setAddress] = useState('')

    const [price, setPrice] = useState(0)
    const [items, setItems] = useState('')
    const [kg, setKg] = useState('')
    const [nos, setNos] = useState("0")

    const [itemArray, setItemArray] = useState([])
    const [divMap, setDivMap] = useState([1])
    const date = new Date()
    const count = divMap.length
    const addItem = () => {
        if (items !== "") {
            if (kg !== "" && nos !== "") {
                setDivMap([...divMap, count + 1])
                setItemArray([...itemArray, { price, items, kg, nos }])

            } else {
                alert("Please fill the item details")
            }
        } else {
            alert("Please fill the item details")
        }
    }

    const myFunc = () => {
        if (section !== "" && items !== "") {
            if (kg !== "" && nos !== "") {
                if (name !== "" && address !== "") {
                    if (phone !== "" && house !== "") {
                        setItemArray([...itemArray, { price, items, kg, nos }])
                    }
                }
            }
        }

    }
    let pri = []
    itemArray.forEach((element) => {
        // console.log(element);
        let pri2 = 0
        pri2 += element.price
        pri = [...pri, pri2]
    })


    var varpri = pri.reduce((a, b) => a + b, 0)
    console.log(varpri);



    // console.log(itemArray);


    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection('Orders').add({
            Name: name,
            Phone_No: phone,
            House_name: house,
            Section: section,
            Items: itemArray,
            Address: address,
            CreatedDate: date.toDateString(),
            Price: varpri
        }).catch((error) => {
            console.log(error.message);
        })
        if (section === "Plassanal") {
            firebase.firestore().collection('Orders-plassanal').add({
                Name: name,
                Phone_No: phone,
                House_name: house,
                Section: section,
                Items: itemArray,
                Address: address,
                CreatedDate: date.toDateString(),
                Price: varpri,
                Deliverd: false,
                Paid: false,
                Comment: ""
            }).then(() => {
                alert("You successfully Ordered")
                history.go(0)
            }).catch((error) => {
                console.log(error.message);
            })
        }
        if (section === "Panakkapalam") {
            firebase.firestore().collection('Orders-Panakkapalam').add({
                Name: name,
                Phone_No: phone,
                House_name: house,
                Section: section,
                Items: itemArray,
                Address: address,
                CreatedDate: date.toDateString(),
                Price: varpri,
                Deliverd: false,
                Paid: false,
                Comment: ""
            }).then(() => {
                alert("You successfully Ordered")
                history.go(0)
            }).catch((error) => {
                console.log(error.message);
            })
        }
        if (section === "Place 3") {
            firebase.firestore().collection('Orders-Place3').add({
                Name: name,
                Phone_No: phone,
                House_name: house,
                Section: section,
                Items: itemArray,
                Address: address,
                CreatedDate: date.toDateString(),
                Price: varpri,
                Deliverd: false,
                Paid: false,
                Comment: ""
            }).then(() => {
                alert("You successfully Ordered")
                history.go(0)
            }).catch((error) => {
                console.log(error.message);
            })

        }
        if (section === "Place 4") {
            firebase.firestore().collection('Orders-Place4').add({
                Name: name,
                Phone_No: phone,
                House_name: house,
                Section: section,
                Items: itemArray,
                Address: address,
                CreatedDate: date.toDateString(),
                Price: varpri,
                Deliverd: false,
                Paid: false,
                Comment: ""
            }).then(() => {
                alert("You successfully Ordered")
                history.go(0)
            }).catch((error) => {
                console.log(error.message);
            })
        }


    }
    return (
        <div>
            <div className="perantDiv">
                <div className="formDiv">
                    <h1>Order Details</h1>
                    <div className="form">
                        <form onSubmit={handleSubmit} autoComplete="true">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name..." name="" id="" required />
                            <input type="tel" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone No." name="" id="" required />
                            <input type="text" value={house} onChange={(e) => setHouse(e.target.value)} placeholder="House Name..." name="" id="" required />
                            <select name="Section" value={section} onChange={(e) => setSection(e.target.value)} id="sectionlist" required>
                                <option value="">Select your Section</option>
                                <option value="Plassanal">Plassanal</option>
                                <option value="Panakkapalam">Panakkapalam</option>
                                <option value="Place 3">Place 3</option>
                                <option value="Place 4">Place 4</option>
                            </select>

                            {divMap.map((div, index) => {
                                return (
                                    <div className="itmesDiv" key={index}>
                                        <select name="Items" className="item" onChange={(e) => {
                                            setItems(e.target.value);
                                            if (e.target.value === "Marble Cake") {
                                                setPrice(110)
                                            }
                                            if (e.target.value === "Pinapple Cake") {
                                                setPrice(150)
                                            }
                                            if (e.target.value === "Plum Cake") {
                                                setPrice(110)
                                            }
                                            if (e.target.value === "Carrot Cake") {
                                                setPrice(150)
                                            }
                                        }} required>
                                            <option value="">Cake</option>
                                            <option value="Marble Cake">Marble Cake</option>
                                            <option value="Pinapple Cake">Pinapple Cake</option>
                                            <option value="Plum Cake">Plum Cake</option>
                                            <option value="Carrot Cake">Carrot Cake</option>
                                        </select>
                                        <select name="Kg" className="item" onChange={(e) => {
                                            setKg(e.target.value)
                                            if (e.target.value === "400g") {
                                                setPrice(price)
                                            }
                                            if (e.target.value === "700g") {
                                                setPrice(price + price)
                                            }
                                            if (e.target.value === "700g" && items === "Plum Cake") {
                                                setPrice(price + price - 20)
                                            }
                                        }} required>
                                            <option value="">Select Kg</option>
                                            <option value="400g">400g</option>
                                            <option value="700g">700g</option>
                                        </select>
                                        <select name="Nos" className="item" onChange={async (e) => {
                                            const value = e.target.value
                                            setNos(e.target.value)
                                            if (value === '1') {
                                                setPrice(price * 1)
                                            }
                                            if (value === '2') {
                                                setPrice(price * 2)
                                            }
                                            if (value === '3') {
                                                setPrice(price * 3)
                                            }
                                            if (value === '4') {
                                                setPrice(price * 4)
                                            }
                                            if (value === '5') {
                                                setPrice(price * 5)
                                            }
                                            if (value === '6') {
                                                setPrice(price * 6)
                                            }
                                            if (value === '7') {
                                                setPrice(price * 7)
                                            }
                                            if (value === '8') {
                                                setPrice(price * 8)
                                            }
                                            if (value === '9') {
                                                setPrice(price * 9)
                                            }
                                            if (value === '10') {
                                                setPrice(price * 10)
                                            }
                                            let varpri = pri.reduce((a, b) => a + b, 0)
                                            console.log(varpri);
                                        }} required>
                                            <option value="">Nos.</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                )
                            })}<p className="additem-btn" onClick={addItem}>+</p>



                            <textarea name="" id="" value={address} onChange={(e) => {
                                setAddress(e.target.value)
                            }} placeholder="Delivery Address..." cols="30" rows="5" required></textarea>
                            <input type="submit" className="FormSub" value="Submit" onClick={myFunc} />
                        </form>
                    </div>
                </div>
                {/* <div className="liveOrder">
                    <div className="Datafield">
                        <h3>Live order No</h3>
                        <p>00</p>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Form