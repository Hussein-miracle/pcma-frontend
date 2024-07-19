import { redirect } from 'next/navigation';


const IndexPage = () => {
  return redirect('/home');
}

export default IndexPage