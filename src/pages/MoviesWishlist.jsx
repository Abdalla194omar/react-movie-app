import React, { useState } from "react";
import { Rating } from "primereact/rating";
import styles from "../styles/Wishlist.module.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlsit } from "../store/slices/WishListSlice";
import { NavLink } from "react-router";

export default function MoviesWishlist() {
  const Wishlist = useSelector((state) =>
    state.wishlist.value.filter((item) => item.type == "movie")
  );
  const dispatch = useDispatch();

  return (
    <>
      <h4 className="container my-4">Movies Wishlist</h4>
      <div className="container">
        {/* Outer Row */}
        <div className="row">
          {/* Inner Box */}
          {Wishlist.length === 0 ? (
            <div className="d-flex flex-column justify-content-center align-items-center my-5">
              <span className="text-center my-3">
                <i
                  className={`fa-solid fa-heart-circle-xmark ${styles.icon}`}
                ></i>
              </span>

              <p className="fs-5 text-center my-3 fw-semibold">
                No Movies in wishlist
              </p>
              <NavLink
                to={"/"}
                className={`text-dark text-center w-25 my-3 ${styles.button}`}
              >
                Back to Home
              </NavLink>
            </div>
          ) : (
            Wishlist.map((movie) => (
              <div
                key={movie.id}
                className={`col-lg-6 col-md-12 col-sm-12 my-3`}
              >
                <div
                  className={`card shadow border-0 rounded-5 p-3 ${styles.card}`}
                >
                  {/* Inner Row */}
                  <div className="row justify-content-center align-items-center">
                    <div className="col-lg-4 col-md-4 d-sm-block">
                      <img
                        src={`${import.meta.env.VITE_TMDB_IMG_URL}${
                          movie.poster_path
                        }`}
                        className={`rounded-5 img-fluid card-img-top ${styles.image}`}
                        alt="Movie Image"
                      />
                    </div>
                    <div className="col-8 p-1 m-0 ">
                      <div className="d-flex justify-content-between pe-2">
                        <span className="card-title fs-3 fw-bold m-0 py-1">
                          {movie.title}
                        </span>
                        <button className="btn btn-transparent p-0">
                          <i
                            className="fa-solid fa-heart fs-5 text-warning"
                            onClick={() => dispatch(removeFromWishlsit(movie))}
                          ></i>
                        </button>
                      </div>
                      <p className={`m-0 py-1 ${styles.date}`}>
                        {movie.release_date}
                      </p>
                      <div className="py-1">
                        <Rating
                          value={Math.round(movie.vote_average / 2)}
                          className={`d-inline-block ps-3 pe-4 ${styles.rating}`}
                          cancel={false}
                        />
                        {movie.vote_count}
                      </div>
                      <div className={`card-text ${styles.scrollable}`}>
                        {movie.overview}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
