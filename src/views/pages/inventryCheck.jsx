import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as Realm from "realm-web";


const app = new Realm.App({ id: "application-0-vmbzlrz" });

export default function InventryCheck() {
    const [info,setInfo] = useState([]);
    function getInfo(){
        axios.get('/api/orders/info').then(function(response){
            setInfo(response.data);
        });
    }
    getInfo();
    // useEffect(() => {
    //     getInfo();
    //     const login = async () => {
    //       // Authenticate anonymously
    //       await app.logIn(Realm.Credentials.anonymous());
    //       const mongodb = app.currentUser.mongoClient("mongodb-atlas");
    //       const collection = mongodb.db("test").collection("orders"); // Everytime a change happens in the stream, add it to the list of events
    //       for await (const change of collection.watch()) {
    //         getInfo();
    //       }
    //     };
    //     login();
    //   }, []);
    
    return (
        <div>
            <h1>在庫確認</h1>
            <table>
                <thead>
                    <tr>
                        <th>商品名</th>
                        <th>注文数</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((item) => (
                        <tr>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>)
}