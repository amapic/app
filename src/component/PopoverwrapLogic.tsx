import React, { useEffect, useState } from 'react';
import {
  subjectregion, subjectregionswitch
} from './observable/observable'
import Popoverwrap from './Popoverwrap';
import theme from '../../custom.d';
import { randomInt } from 'mathjs'
import {mapPropsT,PopoverwrapLogicT} from '../types/interface'
import adresse from '../fonction/conf'
const chercheData = async (url:string):Promise<any> => {

  const response = await fetch(url,{mode:'cors'});
  const responseData = await response.json();

  if (response.ok) {
    return responseData

  } else {
    alert(JSON.stringify(responseData))
    return false
  }

}

interface anchorElT{
  a:boolean|google.maps.MapMouseEvent|EventTarget | null,
  b:number|null,
  c:number|null,
  d:string,
  e?:any
}

const PopoverwrapLogic = ({ object, paths }:PopoverwrapLogicT) => {
  var hovered = false;
  var timer1:NodeJS.Timeout;
  // console.log("rr");
  const [anchorEl, setAnchorEl] = React.useState<anchorElT>({ a: false, b: 0, c: 0, d: "" });
  const [color, setColor] = React.useState<any>(null);
  const [mapProps, setmapProps] = useState({
    etat: "init",
    selectedItems: ["11"],
    hovered: false
  });

  // const COLORS = [theme.palette.secondary.first, theme.palette.secondary.second, theme.palette.secondary.third, theme.palette.secondary.fourth, theme.palette.secondary.fifth, theme.palette.secondary.sixth];
  const COLORS =['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  if (color === null){
    if (object !== "11") {
      setColor(COLORS[randomInt(COLORS.length)])
    }
    else {
      // setColor(theme.palette.secondary.first);
      setColor(COLORS[0]);
    }
  }



  useEffect(() => {
    subjectregionswitch.subscribe({
      next: (v) => {
        setmapProps({
          selectedItems: v,
          etat: "pas_init",
          hovered: mapProps.hovered
        })
      }
    });
  }, [])

  const open = Boolean(anchorEl.b);

  useEffect(() => {
    subjectregion.subscribe(
      v => {
        if (v.includes(object)) {
          setmapProps({
            selectedItems: v,
            etat: "pas_init",
            hovered: mapProps.hovered
          })
        } else {
          setmapProps({
            selectedItems: v,
            etat: "pas_init",
            hovered: mapProps.hovered
          })
        }
      }
    );
  }, [])

  const handlePopoverOpen = (event:google.maps.MapMouseEvent) => {

    if (!hovered) {
      hovered = true;
    }
    
    if (!open) {
      timer1 = setTimeout(() => {
        chercheData(adresse + ":8052/bilan_par_region_dose1/" + object).then((dose1) => {
          var dose1forward=dose1
          if (hovered){
            chercheData(adresse  + ":8052/bilan_par_region_dose2/" + object).then((dose2:any) => {
            dose1forward = (dose1forward * 100).toFixed(2) + "%"
            dose2 = (dose2 * 100).toFixed(2) + "%"
            setAnchorEl({ a: event.domEvent.target, b: null, c: null, d: dose1forward,e:dose2 });
           })
        }
      })
      }, 500);
    }
  };

  const handlePopoverClose = () => {
    hovered = false
    clearTimeout(timer1)
    setAnchorEl({ a: false, b: 0, c: 0, d: "" });
  };

  const props = {color, object, paths, mapProps, anchorEl, open, handlePopoverClose, handlePopoverOpen }
  return (<Popoverwrap key={object} {...props} />)

}
export default PopoverwrapLogic;