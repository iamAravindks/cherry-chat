import { useEffect } from "react";
import {useProfileUserQuery} from '../../services/appApi'

export const Home = () =>
{
  const {data} = useProfileUserQuery()
  
  

  useEffect(() =>
  {
    console.log(data)

  },[])
  return <button className="btn">Hello daisyUI</button>;
}
