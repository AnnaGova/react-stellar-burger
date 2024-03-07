import { useEffect, useState } from 'react'
import styles from './burger-ingredients.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsSection } from '../IngredientsSection/ingredients-section';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchAllIngredients } from "../../services/slice/ingredientsSlice";
import { useInView } from 'react-intersection-observer';




export function BurgerIngredients() {
  const [current, setCurrent] = useState('one')
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.ingredients)
  const [bunsRef, bunsInView] = useInView();
  const [saucesRef, saucesInView] = useInView();
  const [stuffingRef, mainInView] = useInView();

  useEffect(() => {
    dispatch(fetchAllIngredients(["bun", "main", "sauce"]));
  }, [dispatch]);

  useEffect(() => {
    if (bunsInView) {
      setCurrent('one');
    } else if (saucesInView) {
      setCurrent('two');
    } else if (mainInView) {
      setCurrent('three');
    }
  }, [bunsInView, saucesInView, mainInView]);


  return (
    <section className={styles.container}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={`${styles.tab} pb-5`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      {loading || error ? (
        <p className={styles.loading}>{loading ? 'Идет загрузка ингредиентов' : `Произошла ошибка: ${error}`}</p>
      ) : (
        <>
          <div ref={bunsRef}>
            <IngredientsSection sectionName="Булки" type="bun"/>
          </div>
          <div ref={stuffingRef}>
            <IngredientsSection sectionName="Начинки" type="main"/>
          </div>
          <div ref={saucesRef}>
            <IngredientsSection sectionName="Соусы" type="sauces"/>
          </div>
        </>
      )}
    </section>
  )
};
