import React, { lazy } from 'react'
import "../Styles/Vehicles.css"
import { useId, useState, useEffect, useRef, useMemo, useContext, Fragment } from 'react'
import Select from "react-select"
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { ModelContext } from './MainModelManager'
import { useScroll } from './Scroller'
import axios from 'axios'
import { FadeLoader } from 'react-spinners'

function Vehicles() {


    let SelectorVehicleData = [{ Type: "Sedan", Pic: "SedanLogo.webp" }, { Type: "HatchBack", Pic: "HatchBackLogo.webp" }, { Type: "Coupe", Pic: "CoupeLogo.webp" }, { Type: "SUV", Pic: "SuvLogo.webp" }, { Type: "PickUp", Pic: "PickUpLogo.webp" },]

    let [FilterAction, setFilterAction] = useState({ Marca: "", Modelo: "", AñoFrom: 0, AñoUpTo: Infinity, KmFrom: 0, KmUpTo: Infinity, PrecioFrom: 0, PrecioUpTo: Infinity, Type: "" })

    let [PaginatorIndexManager, setPaginatorIndexManager] = useState(0)

    let inputPriceUpto = useRef(null)
    let inputPriceFrom = useRef(null)

    let inputKmsUpTo = useRef(null)
    let inputKmsFrom = useRef(null)

    let [PaginatorFowardStyleManager, SetPaginatorFowardStyleManager] = useState(true)
    let [PaginatorBackwardsStyleManager, setPaginatorBackwardsStyleManager] = useState(false)

    let [userData, setUserData] = useState("")
    let [favorites, setFavorites] = useState([])

    let [FavIDmanager, setFavIdmanager] = useState({selected_id: 0})

    const scrollToElement = useScroll();

    let [VehiclesData, setVehiclesData] = useState([])

    let [isUserLogIn, setIsUserLogIn] = useState(false)

    let [loading, setIsLoading] = useState(true)

async function Starter() {

   try {

    let responseCatalogue = await axios.get("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/GetCatalogue", {})
    
    if(responseCatalogue) {setVehiclesData(responseCatalogue.data)}

   } catch {

    setNotOptionsFilter(true)

   } finally {

     setIsLoading(false)

   }

}

  async function monitorAuthState() {

   await onAuthStateChanged(auth, user => {

    if(user) {

      setIsUserLogIn(true)
      setUserData(user)
 
    } else {

      setIsUserLogIn(false)
      setUserData(null)


    }

   })

  }

useEffect(() => {monitorAuthState()}, [])

useEffect(() => {Starter()}, [])

  async function ToBeFavStarter() {

    if (userData) {

      try {

        const response = await axios.get("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/GetFavorites", {
          params: {
            fav_id: userData.email
          }
        })

        let favIdsArray = []

        response.data.forEach((obj) => {

         favIdsArray.push(obj.catalogue_id)

        })

        setFavorites(favIdsArray)

      } catch (error) {

        console.log(error)

      } 

    } else {

      setFavorites([])

    }

  }

  useEffect(() => {

    ToBeFavStarter()

  }, [userData])

  async function FavChosen() {

    // console.log(FavIDmanager)

    if(userData) {

    if(favorites.includes(FavIDmanager.selected_id)) {

        try {

        const response = await axios.delete("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/RemoveFavorite", {
          params: {
            tonotbe_fav_id: FavIDmanager.selected_id,
            user_email:  userData.email
          }
        })

        } catch(error) {

         console.log(error)

        }


    } else {

        try {

        const response = await axios.post("https://us-central1-gti-motorhouse.cloudfunctions.net/api/auth/AddFavorite", {
       
            tobe_fav_id: FavIDmanager.selected_id,
            user_email:  userData.email
          
        })

        } catch(error) {

         console.log(error)

        }

    } }

    ToBeFavStarter()

  }

  useEffect(() => {

    FavChosen()

  }, [FavIDmanager])

    let ModelOptions = useMemo(() => {

        let Models = [...new Set(VehiclesData.filter(vehicle => {
            return (
                (FilterAction.Type === "" || vehicle.tipo === FilterAction.Type) &&
                (FilterAction.Marca === "" || vehicle.marca === FilterAction.Marca) &&
                ((vehicle.año >= FilterAction.AñoFrom && vehicle.año <= FilterAction.AñoUpTo) || (vehicle.año <= FilterAction.AñoFrom && vehicle.año >= FilterAction.AñoUpTo)) &&
                ((vehicle.kms >= FilterAction.KmFrom && vehicle.kms <= FilterAction.KmUpTo) || (vehicle.kms <= FilterAction.KmFrom && vehicle.kms >= FilterAction.KmUpTo)) &&
                ((vehicle.precio >= FilterAction.PrecioFrom && vehicle.precio <= FilterAction.PrecioUpTo) || (vehicle.precio <= FilterAction.PrecioFrom && vehicle.precio >= FilterAction.PrecioUpTo))
            )
        }).map((val) => val.modelo))].sort((a, b) => a.localeCompare(b))
        return Models.map((val) => ({ value: val, label: val }))
    }, [VehiclesData, FilterAction])

    let MarcaOptions = useMemo(() => {
        let Marcas = [...new Set(VehiclesData.filter(vehicle => {
            return (
                (FilterAction.Type === "" || vehicle.tipo === FilterAction.Type) &&
                (FilterAction.Modelo === "" || vehicle.modelo === FilterAction.Modelo) &&
                ((vehicle.año >= FilterAction.AñoFrom && vehicle.año <= FilterAction.AñoUpTo) || (vehicle.año <= FilterAction.AñoFrom && vehicle.año >= FilterAction.AñoUpTo)) &&
                ((vehicle.kms >= FilterAction.KmFrom && vehicle.kms <= FilterAction.KmUpTo) || (vehicle.kms <= FilterAction.KmFrom && vehicle.kms >= FilterAction.KmUpTo)) &&
                ((vehicle.precio >= FilterAction.PrecioFrom && vehicle.precio <= FilterAction.PrecioUpTo) || (vehicle.precio <= FilterAction.PrecioFrom && vehicle.precio >= FilterAction.PrecioUpTo))
            )
        }).map((val) => val.marca))]
        return Marcas.map((val => ({ value: val, label: val })))
    }, [VehiclesData, FilterAction])

    let AñosOptions = useMemo(() => {
        let Años = [...new Set(VehiclesData.filter(vehicle => {
            return (
                (FilterAction.Type === "" || vehicle.tipo === FilterAction.Type) &&
                (FilterAction.Modelo === "" || vehicle.modelo === FilterAction.Modelo) &&
                (FilterAction.Marca === "" || vehicle.marca === FilterAction.Marca) &&
                ((vehicle.kms >= FilterAction.KmFrom && vehicle.kms <= FilterAction.KmUpTo) || (vehicle.kms <= FilterAction.KmFrom && vehicle.kms >= FilterAction.KmUpTo)) &&
                ((vehicle.precio >= FilterAction.PrecioFrom && vehicle.precio <= FilterAction.PrecioUpTo) || (vehicle.precio <= FilterAction.PrecioFrom && vehicle.precio >= FilterAction.PrecioUpTo))
            )
        }).map((val) => val.año))].sort((a, b) => b - a)
        return Años.map((val) => ({ value: val, label: val.toString() }))
    }, [VehiclesData, FilterAction])

    let TiposOptions = useMemo(() => {
        let Tipos = [...new Set(VehiclesData.filter(vehicle => {
            return (
                (FilterAction.Modelo === "" || vehicle.modelo === FilterAction.Modelo) &&
                (FilterAction.Marca === "" || vehicle.marca === FilterAction.Marca) &&
                ((vehicle.año >= FilterAction.AñoFrom && vehicle.año <= FilterAction.AñoUpTo) || (vehicle.año <= FilterAction.AñoFrom && vehicle.año >= FilterAction.AñoUpTo)) &&
                ((vehicle.kms >= FilterAction.KmFrom && vehicle.kms <= FilterAction.KmUpTo) || (vehicle.kms <= FilterAction.KmFrom && vehicle.kms >= FilterAction.KmUpTo)) &&
                ((vehicle.precio >= FilterAction.PrecioFrom && vehicle.precio <= FilterAction.PrecioUpTo) || (vehicle.precio <= FilterAction.PrecioFrom && vehicle.precio >= FilterAction.PrecioUpTo))
            )
        }).map((val) => val.tipo))]
        return Tipos.map((val => ({ value: val, label: val })))
    }, [VehiclesData, FilterAction])

    let SelectedFilterOptions = useMemo(() => {

        return VehiclesData.filter(vehicle => {
            return (
                (FilterAction.Type === "" || vehicle.tipo === FilterAction.Type) &&
                (FilterAction.Marca === "" || vehicle.marca === FilterAction.Marca) &&
                (FilterAction.Modelo === "" || vehicle.modelo === FilterAction.Modelo) &&
                ((vehicle.año >= FilterAction.AñoFrom && vehicle.año <= FilterAction.AñoUpTo) || (vehicle.año <= FilterAction.AñoFrom && vehicle.año >= FilterAction.AñoUpTo)) &&
                ((vehicle.kms >= FilterAction.KmFrom && vehicle.kms <= FilterAction.KmUpTo) || (vehicle.kms <= FilterAction.KmFrom && vehicle.kms >= FilterAction.KmUpTo)) &&
                ((vehicle.precio >= FilterAction.PrecioFrom && vehicle.precio <= FilterAction.PrecioUpTo) || (vehicle.precio <= FilterAction.PrecioFrom && vehicle.precio >= FilterAction.PrecioUpTo))

                // vehicle.año >= FilterAction.AñoFrom &&
                // vehicle.año <= FilterAction.AñoUpTo &&
                // vehicle.kms >= FilterAction.KmFrom &&
                // vehicle.kms <= FilterAction.KmUpTo &&
                // vehicle.precio >= FilterAction.PrecioFrom &&
                // vehicle.precio <= FilterAction.PrecioUpTo
            )
        })

    }, [FilterAction, VehiclesData])

    let IndexPlus = useId()
    let IndexMinus = useId()

    let [VehicleDataLengthIndex, setVehicleDataLengthIndex] = useState(SelectedFilterOptions.length - 8)

    const containerRef = useRef(null);

    useEffect(() => {

        setVehicleDataLengthIndex(SelectedFilterOptions.length - 8)
        setPaginatorIndexManager(0)


    }, [SelectedFilterOptions])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }, [PaginatorIndexManager])

    useEffect(() => {

        if (PaginatorIndexManager === 0) {

            setPaginatorBackwardsStyleManager(false)

        } else {

            setPaginatorBackwardsStyleManager(true)

        }

        if (PaginatorIndexManager >= VehicleDataLengthIndex) {

            SetPaginatorFowardStyleManager(false)

        } else {

            SetPaginatorFowardStyleManager(true)

        }

    }, [PaginatorIndexManager, VehicleDataLengthIndex])

    function IndexManagerChanger(ReceivedID) {

        switch (ReceivedID) {
            case IndexPlus:

                if (PaginatorIndexManager >= 0 && PaginatorIndexManager < VehicleDataLengthIndex) {

                    setPaginatorIndexManager(Preval => Preval + 8)

                }

                return;
            case IndexMinus:

                if (PaginatorIndexManager > 0) {

                    setPaginatorIndexManager(Preval => Preval - 8)

                }

                return;
        }

    }

    let [NoOptionsFilter, setNotOptionsFilter] = useState(false)

    useEffect(() => {

        if (!SelectedFilterOptions.length) {

            setNotOptionsFilter(true)

        } else {

            setNotOptionsFilter(false)

        }

    }, [SelectedFilterOptions])

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isViewportPc = width >= 1000;

    let [FilterActiveNotPc, setFilterActiveNotPc] = useState(false)

    return (
        <div className="MainVehicles" id="VehiclesScrollRef">

            <div className="VehiclesTypes">

                <div className="VehiclesTypesTittle">

                    <span class="material-symbols-outlined VehiclesFilterTypeApart VehiclesFylterToogleButton" onClick={() => { setFilterActiveNotPc(!FilterActiveNotPc) }} style={{ color: FilterActiveNotPc ? "lightgray" : "" }}> menu </span>

                </div>

                <div className="VehicleTypeSelectorContainer">

                    {SelectorVehicleData.map((val) => {
                        return <div className="VehicleSelectorInstance" onClick={() => { setFilterAction(PreVal => ({ ...PreVal, Type: val.Type })) }} style={{ animation: val.Type === FilterAction.Type ? "none" : "", backgroundColor: val.Type === FilterAction.Type ? "rgb(255, 255, 255, 0.5)" : "", color: val.Type === FilterAction.Type ? "rgb(27, 4, 36)" : "" }}>
                            <div className="VehicleSelectorInstanceCancelButton" onClick={(e) => { e.stopPropagation(), setFilterAction(PreVal => ({ ...PreVal, Type: "" })) }} style={{ display: val.Type === FilterAction.Type ? "flex" : "none" }}><span class="material-symbols-outlined TypeCancelButton" >
                                close
                            </span></div>
                            <span className="TextVehicleSelector">{val.Type}</span>
                            <img src={val.Pic} className="PicVehicleSelector" loading='eager' decoding='async' fetchPriority="high" style={{ animation: val.Type === FilterAction.Type ? "none" : "" }}></img></div>
                    })}

                </div>

            </div>

            <div className="VehiclesFilter" style={{ visibility: isViewportPc ? "visible" : FilterActiveNotPc ? "visible" : "hidden", zIndex: isViewportPc ? 3 : FilterActiveNotPc ? 3 : -1 }}>

                <div className="VehiclesFilterMenu">

                    <div className="VehiclesFilterBrandApart VehiclesFilterTypeApart">
                        <span className="VehicleFilterText">Tipo</span>
                        <Select options={TiposOptions} value={TiposOptions.find(option => option.value === FilterAction.Type) || null} onChange={(SelectOptionTipo) => { setFilterAction(PreVal => ({ ...PreVal, Type: SelectOptionTipo ? SelectOptionTipo.value : "" })) }} className="VehicleFilterSelectorReactSelect" classNamePrefix="SelectModel" placeholder="Marcas" noOptionsMessage={() => ""} isClearable />
                    </div>

                    <div className="VehiclesFilterBrandApart">
                        <span className="VehicleFilterText">Marca</span>
                        <Select options={MarcaOptions} value={MarcaOptions.find(option => option.value === FilterAction.Marca) || null} onChange={(SelectOptionMarca) => { setFilterAction(PreVal => ({ ...PreVal, Marca: SelectOptionMarca ? SelectOptionMarca.value : "" })) }} className="VehicleFilterSelectorReactSelect" classNamePrefix="SelectModel" placeholder="Marcas" noOptionsMessage={() => "Sin marcas"} isClearable />
                    </div>

                    {/* el apartado value del select anterior "MARCA" mas todo lo relacionado al HomeModelSelected en este componente puede dar un error, chequear en caso de que suceda */}

                    <div className="VehiclesFilterModelApart">
                        <span className="VehicleFilterText">Modelo</span>
                        <Select options={ModelOptions} onChange={(SelectOptionModel) => { setFilterAction(PreVal => ({ ...PreVal, Modelo: SelectOptionModel ? SelectOptionModel.value : "" })) }} className="VehicleFilterSelectorReactSelect" classNamePrefix="SelectModel" placeholder="Modelos" noOptionsMessage={() => "Sin modelos"} isClearable />
                    </div>
                    <div className="VehiclesFilterYearApart">
                        <span className="VehicleFilterText">Año</span>
                        <div className="ContainerDoubleSelect">
                            <span className="VehicleFilterTextB">Desde</span>
                            <Select options={AñosOptions} onChange={(SelectOptionYearFrom) => { setFilterAction(PreVal => ({ ...PreVal, AñoFrom: SelectOptionYearFrom ? SelectOptionYearFrom.value : 0 })) }} className="VehicleFilterSelectorReactSelectB" classNamePrefix="SelectModel" placeholder="" noOptionsMessage={() => "-"} onInputChange={(value, { action }) => { if (action === "input-change") { return value.replace(/[^0-9]/g, ""); } return value; }} isClearable />

                        </div>
                        <div className="ContainerDoubleSelect">
                            <span className="VehicleFilterTextB">Hasta</span>
                            <Select options={AñosOptions} onChange={(SelectOptionYearUpTo) => { setFilterAction(PreVal => ({ ...PreVal, AñoUpTo: SelectOptionYearUpTo ? SelectOptionYearUpTo.value : Infinity })) }} className="VehicleFilterSelectorReactSelectB" classNamePrefix="SelectModel" placeholder="" noOptionsMessage={() => "-"} onInputChange={(value, { action }) => { if (action === "input-change") { return value.replace(/[^0-9]/g, ""); } return value; }} isClearable />
                        </div>

                    </div>
                    <div className="VehiclesFilterMileageApart">
                        <span className="VehicleFilterText">Kilometros</span>
                        <div className="ContainerDoubleSelect">
                            <span className="VehicleFilterTextB">Desde</span>
                            <input className="VehicleFilterInput" ref={inputKmsFrom} onBlur={(e) => { setFilterAction(PreVal => ({ ...PreVal, KmFrom: e.target.value })) }}></input>
                            <div className="ResetButtonInputContainer" onClick={() => { setFilterAction(prev => ({ ...prev, KmFrom: 0 })), inputKmsFrom.current.value = "" }}><span class="material-symbols-outlined ResetButtonInputs" style={{ display: (FilterAction.KmFrom) ? "block" : "none" }}>
                                close
                            </span></div>
                        </div>
                        <div className="ContainerDoubleSelect">
                            <span className="VehicleFilterTextB">Hasta</span>
                            <input className="VehicleFilterInput" ref={inputKmsUpTo} onBlur={(e) => { if (e.target.value) { setFilterAction(PreVal => ({ ...PreVal, KmUpTo: e.target.value })) } else { setFilterAction(PreVal => ({ ...PreVal, KmUpTo: Infinity })) } }}></input>
                            <div className="ResetButtonInputContainer" onClick={() => { setFilterAction(prev => ({ ...prev, KmUpTo: Infinity })), inputKmsUpTo.current.value = "" }}><span class="material-symbols-outlined ResetButtonInputs" style={{ display: (!FilterAction.KmUpTo || FilterAction.KmUpTo != Infinity) ? "block" : "none" }}>
                                close
                            </span></div>
                        </div>
                    </div>
                    <div className="VehiclesFilterPriceApart">
                        <span className="VehicleFilterText">Precio</span>
                        <div className="ContainerDoubleSelect">
                            <span className="VehicleFilterTextB">Desde</span>
                            <input className="VehicleFilterInput" ref={inputPriceFrom} onBlur={(e) => { setFilterAction(PreVal => ({ ...PreVal, PrecioFrom: e.target.value })) }}></input>
                            <div className="ResetButtonInputContainer" onClick={() => { setFilterAction(prev => ({ ...prev, PrecioFrom: 0 })), inputPriceFrom.current.value = "" }}><span class="material-symbols-outlined ResetButtonInputs" style={{ display: (FilterAction.PrecioFrom) ? "block" : "none" }}>
                                close
                            </span></div>
                        </div>
                        <div className="ContainerDoubleSelect">
                            <span className="VehicleFilterTextB">Hasta</span>
                            <input className="VehicleFilterInput" ref={inputPriceUpto} onBlur={(e) => { if (e.target.value) { setFilterAction(PreVal => ({ ...PreVal, PrecioUpTo: e.target.value })) } else { setFilterAction(PreVal => ({ ...PreVal, PrecioUpTo: Infinity })) } }}></input>
                            <div className="ResetButtonInputContainer" onClick={() => { setFilterAction(prev => ({ ...prev, PrecioUpTo: Infinity })), inputPriceUpto.current.value = "" }}><span class="material-symbols-outlined ResetButtonInputs" style={{ display: (!FilterAction.PrecioUpTo || FilterAction.PrecioUpTo != Infinity) ? "block" : "none" }}>
                                close
                            </span>
                            </div>
                        </div>
                    </div>

                    <div className="VehiclesFilterResetButtonApart">
                        <button type="button" className="FilterResetButton" onClick={() => window.location.reload()}>Restablecer</button>
                    </div>

                </div>

            </div>

            <div className="VehiclesCatalogue" onClick={() => { setFilterActiveNotPc(false) }}>

{loading ?           <div className='LoadingOnMainCatalogue'>  <FadeLoader
    color="#1b0424"
    loading={true}
    height={40}
    width={5}
    radius={2}
    margin={20}
  /> </div>:                <div className="VehicleCatalogueContainer" ref={containerRef}>

                    {SelectedFilterOptions.map((val, index) => {

                        if (index === PaginatorIndexManager || index === PaginatorIndexManager + 1 || index === PaginatorIndexManager + 2 || index === PaginatorIndexManager + 3 || index === PaginatorIndexManager + 7 || index === PaginatorIndexManager + 4 || index === PaginatorIndexManager + 5 || index === PaginatorIndexManager + 6) {


                            return <div className="CataloguePost">
                                <div className="CalaloguePostBox">

                                    <img loading='eager' decoding='async' className="PostPic" src={val.foto}></img>

                                    <div className="FavMarkPost" onClick={() => {setFavIdmanager({selected_id: val.catalogue_id})}} style={{display: isUserLogIn ? "flex" : "none"}}><span class="material-symbols-outlined FavPost" style={{fontVariationSettings: favorites.includes(val.catalogue_id) ? "'FILL' 1" : "'FILL' 0"}}>favorite</span></div>

                                    <div className="PostName">
                                        <span>{val.año.toString() + " " + val.marca + " " + val.modelo} </span>
                                    </div>

                                    <div className="PostKMS">
                                        <span class="material-symbols-outlined">
                                            speed
                                        </span><span className="KmsText">{val.kms.toLocaleString("es-AR").toString() + " Km"}</span>
                                    </div>

                                    <div className="PostTypeFilter">
                                        <span className="PostTypeFilterContainer">{val.tipo}</span>
                                    </div>

                                    <div className="PostMainCharacteristics">
                                        <div className="TransmisionInfo"><span class="material-symbols-outlined">
                                            auto_transmission
                                        </span><span className="InternInfoFix">{val.caja}</span></div>
                                        <div className="EngineInfo">
                                            <span class="material-symbols-outlined">
                                                local_gas_station
                                            </span>
                                            <span className="InternInfoFix">{val.combustible}</span>
                                        </div>
                                    </div>

                                    <div className="PostActionSection">

                                        <div className="PostPrice">
                                            <span>{val.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" }).toString()}</span>
                                        </div>

                                        <div className="PostActionButton">
                                            <button type="button" className="BuyNowButton">Mas informacion</button>
                                        </div>

                                    </div>


                                </div> </div>

                        }


                    })}

                    {NoOptionsFilter ? <div className="NoAvailableOptionsSign">
                        <div className="NoOptionsAvailablePic"> </div>
                        <span className="NoOptionsAvailableText">No se encontraron vehiculos</span>
                    </div> : ""}

                </div>}

                {NoOptionsFilter ? "" : <div className="VehicleCatalogueButtons">

                    <div className="CatalogueButtonsContainer">

                        <div className="CatalogueArrow" style={{ animation: PaginatorBackwardsStyleManager ? "" : "none", cursor: PaginatorBackwardsStyleManager ? "" : "default", opacity: PaginatorBackwardsStyleManager ? "" : 0.25 }} onClick={() => { IndexManagerChanger(IndexMinus) }}><span className="material-symbols-outlined ArrrowAsText">arrow_back</span></div>

                        <div className="CatalogueNumbers">

                            {Array.from({ length: Math.ceil(VehicleDataLengthIndex / 8) + 1 }, (val, index) => { if (index === PaginatorIndexManager / 8) { return <span className="MainNumberCatalogue">{index}</span> } else { return <span onClick={() => { setPaginatorIndexManager(index * 8) }} className="SecondaryNumberCatalogue">{index}</span> } })}

                        </div>

                        <div className="CatalogueArrow" style={{ animation: PaginatorFowardStyleManager ? "" : "none", cursor: PaginatorFowardStyleManager ? "" : "default", opacity: PaginatorFowardStyleManager ? "" : 0.25 }} onClick={() => { IndexManagerChanger(IndexPlus) }}><span className="material-symbols-outlined ArrrowAsText">arrow_forward</span></div>

                    </div>

                </div>}

            </div>

        </div>
    )
}

export default Vehicles