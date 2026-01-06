import React from 'react'
import "../Styles/News.css"
import { useScroll } from './Scroller'



function News() {

  const scrollToElement = useScroll();

  let NewsData = [{NewsImg: "url(./public/noticia1.jpg)", NewsTittle: "Toyota Corolla Cross, El SUV híbrido más elegido en el 2025"},{NewsImg: "url(./public/noticia2.jpg)", NewsTittle: "El Volkswagen Golf GTI cumple 50 años y lo celebra a lo grande"},{NewsImg: "url(./public/noticia3.jpg)", NewsTittle: "El Volkswagen Passat más deseado: berlina y 1.300 km de autonomía"},]

  return (

    <div className="MainNews" id="NewsScrollRef" onClick={() => { scrollToElement("NewsScrollRef") }}>

      <div className="ContainerNewsTittle">

        <div className="SeparatorNews"></div>

        <span className="SpanBrandNews">Ultimas Noticias</span>

        <div className="SeparatorNews"></div>

      </div>

      <div className="NewsContainer">

        {NewsData.map((val) => {return <div className="NewsDataBox">

          <div className="NewsImg" style={{backgroundImage: val.NewsImg}}></div>
          <div className="NewsTittle"><span>{val.NewsTittle}</span></div>

        </div>

        })}

      </div>

    </div>
  )
}

export default News