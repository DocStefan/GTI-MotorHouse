// import React from 'react'
// import "../Styles/News.css"
// import { useScroll } from './Scroller'
// import { useState, useEffect } from 'react';
// import axios from 'axios';



// function News() {

//   const scrollToElement = useScroll();

//   // let NewsData = [{NewsImg: "url(./noticia1.jpg)", NewsTittle: "Toyota Corolla Cross, El SUV híbrido más elegido en el 2025"},{NewsImg: "url(./noticia2.jpg)", NewsTittle: "El Volkswagen Golf GTI cumple 50 años y lo celebra a lo grande"},{NewsImg: "url(./noticia3.jpg)", NewsTittle: "El Volkswagen Passat más deseado: berlina y 1.300 km de autonomía"},]

//   let [NewsData, setNewsData] = useState([])

// async function Starter() {

//    try {

//     let responseNews = await axios.get("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/GetNews", {})
//     if(responseNews) {setNewsData(responseNews.data)}

//    } catch {}

// }

// useEffect(() => {Starter()}, [])

//   return (

//     <div className="MainNews" id="NewsScrollRef" onClick={() => { scrollToElement("NewsScrollRef") }}>

//       <div className="ContainerNewsTittle">

//         <div className="SeparatorNews"></div>

//         <span className="SpanBrandNews">Ultimas Noticias</span>

//         <div className="SeparatorNews"></div>

//       </div>

//       <div className="NewsContainer">

//         {NewsData.map((val) => {return <div className="NewsDataBox">

//           <img loading='eager' decoding='async' className="NewsImg" src={val.NewsImg}></img>
//           <div className="NewsTittle"><span>{val.NewsTittle}</span></div>

//         </div>

//         })}

//       </div>

//     </div>
//   )
// }

// export default News