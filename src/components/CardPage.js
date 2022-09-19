import React from 'react'
import axios from './interceptors/axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import img from "../image/cardLogo.png"
import { useSelector } from "react-redux"
import { useCallback } from 'react'




function Card() {
  const [card, setCard] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(9);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPost = card.slice(firstPostIndex, lastPostIndex)
  const totalPosts = card.length
  const selector = useSelector(state => state.searchDatareducer)
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i)
  }

  const getData = useCallback(async () => {
    setIsLoading(true)
    setTimeout(() => {
      axios.get(process.env.REACT_APP_CARDPAGE)
        .then(res => res.data)
        .then(res => {
          setIsLoading(false)
          setCard(res)
        })
    }, 1000);
  }, [])

  useEffect(() => {
    getData()
  }, [])


  return (
    <div>
      {
        isLoading && <span className="loader"></span>
      }
      <div className='container'>
        <div className='row'>
          {
            currentPost?.filter((a) => {
              if (selector == "") {
                return a
              }
              else if (a.projectName.toLowerCase().includes(selector.toLowerCase())) {
                return a
              }
            }).map((a, b) => (
              <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center" key={b}>
                <div className='card' >
                  <img src={img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{a.projectName}</h5>
                    <Link to={`${a.projectId}`} className='more-detail'><button className="btn">More Detail</button></Link>
                  </div>
                </div>
              </div>
            ))
          }
          <div className='pagination container main-pag'>
            {
              pages.map((a, b) => (
                <button key={b} onClick={() => setCurrentPage(a)} className={a == currentPage ? "active" : ''}>
                  {a}
                </button>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Card)