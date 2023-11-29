import React from "react";
import { createSelector } from "@reduxjs/toolkit";
export const cosmeticsListSelector = (state) => state.cosmeticsList.cosmetics;
export const searchTextSelector = (state) => state.filters.searchText;
export const searchCategorySelector = (state) => state.filters.category;
export const searchTypeSelector = (state) => state.filters.type;
export const searchPriceSelector = (state) => state.filters.price;
export const searchBrandSelector = (state) => state.filters.brand;

export const filtersCosmeticsSelector = createSelector(
  cosmeticsListSelector,
  searchTextSelector,
  searchCategorySelector,
  searchTypeSelector,
  searchPriceSelector,
  searchBrandSelector,
  (cosmetics, searchText, category, type, price, brand) => {
    let filtersCosmetics = [...cosmetics];
    if (searchText) {
      filtersCosmetics = filtersCosmetics.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (category !== "All") {
      filtersCosmetics = filtersCosmetics.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (type !== "All") {
      filtersCosmetics = filtersCosmetics.filter(
        (p) => p.type.toLowerCase() === type.toLowerCase()
      );
    }
    if (brand !== "All") {
      filtersCosmetics = filtersCosmetics.filter(
        (p) => p.brand.toLowerCase() === brand.toLowerCase()
      );
    }
    if (price !== "0,0") {
      const [min, max] = price.split(",");
      if (min !== max) {
        filtersCosmetics = filtersCosmetics.filter(
          (p) => p.currentPrice > Number(min) && p.currentPrice <= Number(max)
        );
      } else {
        filtersCosmetics = filtersCosmetics.filter(
          (p) => p.currentPrice > Number(min)
        );
      }
    }
    return filtersCosmetics;
  }
);
