/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import css from '../../styles/pages/catalog-page'
import ReactSelect from '../comps/ReactSelectNoIcons'
import Input from '../comps/input/Input.jsx'
import Button from '../comps/button/Button.jsx'
import CardPreview from '../views/CardPreview'
import RequestComponent from '../../services/request.service'
import SelectAkk from '../../services/selectAkk.service'
import arrowImg from '../../img/arrow.png'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../../appStore/reducers/desktopPaginationReducer'
import { setActualCategory } from '../../appStore/reducers/mainReducer'

const Main = css.Main
const ContentLine = css.MainContentLine
const PodborWindow = css.PodborWindow
const PodborWindowContentLine = css.PodborWindowContentLine

const CatalogPage = () => {

  const items = useSelector(state => state.catalog.catalog)
  const actualCategory = useSelector(state => state.main.actualCategory)
  const paginationCount = useSelector(state => state.desktopPagination.count)
  const selectionData = useSelector(state => state.selectionSettings.settings)
  const mainMenuRemote = useSelector(state => state.main.catalogMenuRemote)
  const mainMarksRemote = useSelector(state => state.main.catalogMarksRemote)
  const mainModelsRemote = useSelector(state => state.main.catalogModelsRemote)
  const mainGenerationsRemote = useSelector(state => state.main.catalogGenerationsRemote)
  const mainEnginesRemote = useSelector(state => state.main.catalogEnginesRemote)

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const startRef = useRef()
  const catalogCategory = params.category

  let jsonCatalog = useSelector(state => state.catalog.generalCatalog)
  let generalCatalog = null
  
  if ( catalogCategory ) {

    jsonCatalog ? generalCatalog = JSON.parse(jsonCatalog)[0].product : generalCatalog = null

  } else {

    jsonCatalog 
      ? generalCatalog = JSON.parse(jsonCatalog)[0].product.filter(
          item => { 

            if ( actualCategory.id && actualCategory.id.includes(item.groups[0].id[0].toLowerCase()) ) {

              return item

            }
          }
        ) : generalCatalog = null

  }

  function selectSubCategory(props) {

    const { id, label } = props
    dispatch(setActualCategory({ id, label}))

  }

  function scrollStart() {

    startRef.current.scrollIntoView({ behavior: 'smooth' })

  }

  useEffect(() => document.documentElement.scrollTop = 0,[])
  useEffect(() => false && console.log(catalogCategory),[])
  useEffect(() => false && console.log(actualCategory),[])
  useEffect(() => false && console.log(selectionData),[])

  return (
    <React.Fragment>

      <RequestComponent
        make={false}
        callbackAction={'GET_CATALOG'}
        requestData={{
          type: 'GET',
          urlstring: '/products',
        }}
      />

      <Main>
        <ContentLine ref={startRef} style={{ justifyContent: 'space-between' }}>

          <SelectAkk 
            categories={mainMenuRemote}
            marks={mainMarksRemote} 
            models={mainModelsRemote}
            gens={mainGenerationsRemote}
            engines={mainEnginesRemote}
          />

        </ContentLine>
        <ContentLine style={{ justifyContent: 'space-between', marginTop: '6px', marginBottom: '27px' }}>

          <h2>{ JSON.parse(selectionData).car } { JSON.parse(selectionData).model } { JSON.parse(selectionData).generation }</h2>
          <div 
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <Button
              inner={"???? ????????"}
              params={{
                background: 'transparent'
              }}
              css={{
                fontSize: '13px',
                paddingTop: '7px',
                paddingBottom: '8px',
                paddingLeft: '34px',
                paddingRight: '10px',
                marginRight: '14px'
              }}
              children={
                <img
                  style={{
                    display: 'block',
                    position: 'absolute',
                    width: '14px',
                    top: '50%',
                    left: '0%',
                    marginTop: '-8px',
                    marginLeft: '10px'
                  }}
                  src={arrowImg}
                  alt={""}
                />
              }
            />
            <Button
              inner={"???? ????????????????????????"}
              params={{
                background: 'transparent'
              }}
              css={{
                fontSize: '13px',
                paddingTop: '7px',
                paddingBottom: '8px',
                paddingLeft: '34px',
                paddingRight: '10px',
              }}
              children={
                <img
                  style={{
                    display: 'block',
                    position: 'absolute',
                    width: '14px',
                    top: '50%',
                    left: '0%',
                    marginTop: '-8px',
                    marginLeft: '10px'
                  }}
                  src={arrowImg}
                  alt={""}
                />
              }
            />
          </div>

        </ContentLine>
        <ContentLine style={{ justifyContent: 'space-between' }}>
          <PodborWindow width={'65%'}>

            <PodborWindowContentLine>
              <h4>???? ????????????????????</h4>
            </PodborWindowContentLine>
            <PodborWindowContentLine>

              <span style={{ display: 'block', width: '180px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>?????????? ????????????????</span>
              <span style={{ display: 'block', width: '180px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>???????????? (??*??*??)</span>
              <span style={{ display: 'block', width: '140px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>????????????????????</span>
              <span style={{ display: 'block', width: '280px', fontSize: '13px', fontWeight: 'bold' }}>???????????????? ?????? ????????????????????????</span>

            </PodborWindowContentLine>
            <PodborWindowContentLine>

              <ReactSelect 
                placeholder={"???????????????? ??????????"}
                params={{ width: 180 }}
                data={[
                  { value: '001', label: 'no brand' },
                  { value: '002', label: 'no brand' },
                ]}
              />
              <span style={{ width: '10px' }}></span>
              <ReactSelect 
                placeholder={"???????????????? ????????????"}
                params={{ width: 180 }}
                data={[
                  { value: '001', label: 'no size' },
                  { value: '002', label: 'no size' },
                ]}
              />
              <span style={{ width: '10px' }}></span>
              <ReactSelect 
                placeholder={"????????????????????"}
                params={{ width: 140 }}
                data={[
                  { value: '001', label: '????????????' },
                  { value: '002', label: '????????????????' },
                ]}
              />

              <span style={{ width: '10px' }}></span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  width: '280px'
                }}
              >

                <Input
                  params={{ width: 60 }}
                  type={"text"}
                  placeholder={"10"}
                  inputCss={{ border: 'none', textAlign: 'center', paddingRight: '12px' }}
                  css={{ marginTop: '0px' }}
                />
                <div
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '140px',
                    height: '4px',
                    backgroundColor: '#565656',
                    marginLeft: '2px'
                  }}
                >

                  <span 
                    style={{
                      display: 'block',
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#565656',
                      top: '50%',
                      marginTop: '-5px',
                      left: '0'
                    }}
                  ></span>
                  <span 
                    style={{
                      display: 'block',
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#565656',
                      top: '50%',
                      marginTop: '-5px',
                      left: '100%',
                      marginLeft: '-10px'
                    }}
                  ></span>

                </div>
                <Input
                  params={{ width: 60 }}
                  type={"text"}
                  placeholder={"50"}
                  inputCss={{ border: 'none', textAlign: 'center', paddingRight: '12px' }}
                  css={{ marginTop: '0px' }}
                />

              </div>

            </PodborWindowContentLine>
            <PodborWindowContentLine>

              <span style={{ display: 'block', width: '140px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>?????? ??????????</span>
              <span style={{ display: 'block', width: '140px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>????????????????????</span>
              <span style={{ display: 'block', width: '220px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>?????????????? ???????????????????????? ????</span>
              <span style={{ display: 'block', width: '280px', fontSize: '13px', fontWeight: 'bold' }}>?????????????????? ????????????????????????</span>

            </PodborWindowContentLine>
            <PodborWindowContentLine style={{ marginBottom: '0px' }}>

              <ReactSelect 
                placeholder={"??????????????"}
                params={{ width: 140 }}
                data={[
                  { value: '001', label: 'no params' },
                  { value: '002', label: 'no params' },
                ]}
              />
              <span style={{ width: '10px' }}></span>
              <ReactSelect 
                placeholder={"??????????????"}
                params={{ width: 140 }}
                data={[
                  { value: '001', label: 'no params' },
                  { value: '002', label: 'no params' },
                ]}
              />

              <span style={{ width: '10px' }}></span>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  width: '220px'
                }}
              >

                <Input
                  params={{ width: 60 }}
                  type={"text"}
                  placeholder={"100"}
                  inputCss={{ border: 'none', textAlign: 'center', paddingRight: '12px' }}
                  css={{ marginTop: '0px' }}
                />
                <div
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '80px',
                    height: '4px',
                    backgroundColor: '#565656',
                    marginLeft: '0px'
                  }}
                >

                  <span 
                    style={{
                      display: 'block',
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#565656',
                      top: '50%',
                      marginTop: '-5px',
                      left: '0'
                    }}
                  ></span>
                  <span 
                    style={{
                      display: 'block',
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#565656',
                      top: '50%',
                      marginTop: '-5px',
                      left: '100%',
                      marginLeft: '-10px'
                    }}
                  ></span>

                </div>
                <Input
                  params={{ width: 60 }}
                  type={"text"}
                  placeholder={"5000"}
                  inputCss={{ border: 'none', textAlign: 'center', paddingRight: '12px' }}
                  css={{ marginTop: '0px' }}
                />

              </div>

              <span style={{ width: '10px' }}></span>
              
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                  width: '280px'
                }}
              >

                <Input
                  params={{ width: 60 }}
                  type={"text"}
                  placeholder={"2500"}
                  inputCss={{ border: 'none', textAlign: 'center', paddingRight: '12px' }}
                  css={{ marginTop: '0px' }}
                />
                <div
                  style={{
                    display: 'block',
                    position: 'relative',
                    width: '140px',
                    height: '4px',
                    backgroundColor: '#565656',
                    marginLeft: '2px'
                  }}
                >

                  <span 
                    style={{
                      display: 'block',
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#565656',
                      top: '50%',
                      marginTop: '-5px',
                      left: '0'
                    }}
                  ></span>
                  <span 
                    style={{
                      display: 'block',
                      position: 'absolute',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#565656',
                      top: '50%',
                      marginTop: '-5px',
                      left: '100%',
                      marginLeft: '-10px'
                    }}
                  ></span>

                </div>
                <Input
                  params={{ width: 60 }}
                  type={"text"}
                  placeholder={"8300"}
                  inputCss={{ border: 'none', textAlign: 'center', paddingRight: '12px' }}
                  css={{ marginTop: '0px' }}
                />

              </div>

            </PodborWindowContentLine>

          </PodborWindow>
          <PodborWindow width={'34%'}>

            <PodborWindowContentLine>
              <h4>???? ??????????????????????</h4>
            </PodborWindowContentLine>
            <PodborWindowContentLine>

              <span style={{ display: 'block', width: '160px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>?????????? ????????????????????</span>
              <span style={{ display: 'block', width: '160px', fontSize: '13px', fontWeight: 'bold' }}>???????????? ????????????????????</span>

            </PodborWindowContentLine>
            <PodborWindowContentLine>

              <ReactSelect 
                placeholder={"?????????? ??????????"}
                params={{ width: 160 }}
                data={[
                  { value: '001', label: 'no params' },
                  { value: '002', label: 'no params' },
                ]}
              />
              <span style={{ width: '10px' }}></span>
              <ReactSelect 
                placeholder={"?????????? ????????????"}
                params={{ width: 160 }}
                data={[
                  { value: '001', label: 'no params' },
                  { value: '002', label: 'no params' },
                ]}
              />

            </PodborWindowContentLine>
            <PodborWindowContentLine>

              <span style={{ display: 'block', width: '160px', fontSize: '13px', fontWeight: 'bold', marginRight: '10px' }}>?????????? ??????????????????</span>
              <span style={{ display: 'block', width: '160px', fontSize: '13px', fontWeight: 'bold' }}>??????????????????</span>

            </PodborWindowContentLine>
            <PodborWindowContentLine style={{ marginBottom: '0px' }}>

              <ReactSelect 
                placeholder={"??????????????????"}
                params={{ width: 160 }}
                data={[
                  { value: '001', label: 'no params' },
                  { value: '002', label: 'no params' },
                ]}
              />
              <span style={{ width: '10px' }}></span>
              <ReactSelect 
                placeholder={"??????????????????"}
                params={{ width: 160 }}
                data={[
                  { value: '001', label: 'no params' },
                  { value: '002', label: 'no params' },
                ]}
              />

            </PodborWindowContentLine>

          </PodborWindow>
        </ContentLine>
        
        { generalCatalog === null || generalCatalog.length === 0 ? <ContentLine style={{ justifyContent: 'flex-start', flexWrap: 'wrap' }}>

          { items ? items.map((item, index) => {

            return (
              <React.Fragment key={index}>
                <CardPreview
                  params={{ width: 15.833333, mleft: 0 }}
                  image={null}
                  title={item.name}
                  description={item.discr}
                  coast1={item.coast1}
                  coast2={item.coast2}
                  itemID={item.itemID}
                />
                { index < 5 && <span 
                  style={{ 
                    display: 'block',
                    position: 'relative',
                    width: '1%',
                    height: '300px',
                    boxSizing: 'border-box'
                  }}
                ></span> }
              </React.Fragment>
            )

          }) : null }

        </ContentLine> : 
        <ContentLine style={{ justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: '8px' }}>

          { generalCatalog ? generalCatalog.map((item, index) => {

            return <React.Fragment key={index}>{
              index < paginationCount + 2 && <React.Fragment key={index}>
                <CardPreview
                  params={{ width: 15.833333, mleft: 0 }}
                  image={null}
                  title={item.name}
                  description={[
                    `?????????? : ${item.properties[0].property[0].value[0]}`,
                    `?????????????????????????? : ${item.properties[0].property[1].value[0]}`,
                  ]}
                  coast1={
                    +item.pre_order_prices[0].region[0].price[0] === 0
                      ? '--' : item.pre_order_prices[0].region[0].price[0]
                  }
                  coast2={
                    +item.pre_order_prices[0].region[0].price_discount[0] === 0
                      ? '--' : item.pre_order_prices[0].region[0].price_discount[0]
                  }
                  itemID={item.id[0]}
                />
                
                { (( index < 5 ) || 
                   ( index > 5 && index < 11 )  ||
                   ( index > 11 && index < 17 ) ||
                   ( index > 17 && index < 23 ) ||
                   ( index > 23 && index < 29 ) ||
                   ( index > 29 && index < 35 ) ||
                   ( index > 35 && index < 41 ) ||
                   ( index > 41 && index < 47 ) ||
                   ( index > 47 && index < 53 ) ||
                   ( index > 53 && index < 59 ) ||
                   ( index > 59 && index < 65 ) ||
                   ( index > 65 && index < 71 ) ||
                   ( index > 71 && index < 77 ) ||
                   ( index > 77 && index < 83 ) ||
                   ( index > 83 && index < 89 ) ||
                   ( index > 89 && index < 95 ) ||
                   ( index > 95 && index < 101 ) ||
                   ( index > 101 && index < 107 ) ||
                   ( index > 107 && index < 113 ) ||
                   ( index > 113 && index < 119 ) ||
                   ( index > 119 && index < 125 ) ||
                   ( index > 125 && index < 131 ) ||
                   ( index > 131 && index < 137 ) ||
                   ( index > 137 && index < 143 ) ||
                   ( index > 143 && index < 149 ) ||
                   ( index > 149 && index < 155 ) ||
                   ( index > 155 && index < 161 ) ||
                   ( index > 161 && index < 167 ) ||
                   ( index > 167 && index < 173 ) ||
                   ( index > 173 && index < 179 ) ||
                   ( index > 179 && index < 185 ) ||
                   ( index > 185 && index < 191 ) ||
                   ( index > 191 && index < 197 ) ||
                   ( index > 197 && index < 203 ) ||
                   ( index > 203 && index < 209 ) ||
                   ( index > 209 && index < 215 ) ||
                   ( index > 215 && index < 221 ) ||
                   ( index > 221 && index < 227 ) ||
                   ( index > 227 && index < 233 ) ||
                   ( index > 233 && index < 239 ) || 
                   ( index > 239 && index < 245 ) ||
                   ( index > 245 && index < 251 ) ||
                   ( index > 251 && index < 257 ) ||
                   ( index > 257 && index < 263 ) ||
                   ( index > 263 && index < 269 ) ||
                   ( index > 269 && index < 275 ) ||
                   ( index > 275 && index < 281 ) ||
                   ( index > 281 && index < 287 ) ||
                   ( index > 287 && index < 293 ) ||
                   ( index > 293 && index < 299 ) ||
                   ( index > 299 && index < 305 )) && <span 
                  style={{ 
                    display: 'block',
                    position: 'relative',
                    width: '1%',
                    height: '300px',
                    boxSizing: 'border-box'
                  }}
                ></span> }

              </React.Fragment>
            }</React.Fragment>

          }) : null }

        </ContentLine> }
        { false && <ContentLine style={{ justifyContent: 'space-around', marginTop: '0px', marginBottom: '33px' }}>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              position: 'relative',
              width: '200px'
            }}
          >

            <span 
              style={{ 
                color: '#2E2E2E', 
                fontSize: '13px', 
                fontWeight: 'bold', 
                cursor: 'pointer' 
              }}
              onClick={() => {
                dispatch(decrement(20))
                navigate(`/catalog/${catalogCategory}/${paginationCount - 20}`)
              }}
            >????????????</span>
            <div>
              <span
                style={{
                  display: 'block',
                  color: 'white',
                  backgroundColor: '#2E2E2E',
                  fontSize: '13px',
                  width: '46px',
                  height: '36px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  lineHeight: '36px'
                }}
              >
                
                { paginationCount }</span>
            </div>
            <span 
              style={{ 
                color: '#2E2E2E', 
                fontSize: '13px', 
                fontWeight: 'bold', 
                cursor: 'pointer' 
              }}
              onClick={() => {
                dispatch(increment(20))
                navigate(`/catalog/${catalogCategory}/${paginationCount + 20}`)
              }}
            >????????????</span>

          </div>

        </ContentLine> }
        <ContentLine style={{ justifyContent: 'space-around', marginTop: '0px', marginBottom: '20px' }}>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              position: 'relative',
              width: '200px'
            }}
          >

            <div>
              <span
                onClick={scrollStart}
                style={{
                  display: 'block',
                  color: 'grey',
                  backgroundColor: 'transparent',
                  fontSize: '13px',
                  width: '186px',
                  height: '36px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  lineHeight: '36px',
                  cursor: 'pointer'
                }}
              >?????????????????? ?? ???????????? ????????????????</span>
            </div>

          </div>

        </ContentLine>
      </Main>
    </React.Fragment>
  )
}

export default CatalogPage