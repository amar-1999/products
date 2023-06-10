import React, {useState, useEffect} from 'react'
import './App.css'
const App = () => {
  const  [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  useEffect(() => {
    fetch('https://dummyjson.com/products')
    .then(response => response.json()
    .then(data => {console.log(data, 'data'); setData(data.products)}))
    .catch(error => console.log(error))
  }, []);


  const Card = ({title, description, price, image}) => {
    return(
      <div className='card' style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: '1 0 auto', height: '200px', overflow: 'hidden' }}>
          <img src={image} alt='product' style={{ height: '100%', width: '100%', objectFit: 'fill'}} />
        </div>
        <div className='card-body' style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column' }}>
          <div>
            <h2 className='card-title'>{title}</h2>
            <p className='card-text' style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {description}
            </p>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <p className='card-price'>Price: INR {price}</p>
          </div>
        </div>
      </div>
    )
  }

  const onSearch = (e) => {
    setSearchItem(e.target.value);
  }
  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(searchItem.toLowerCase());
  })
  console.log(filteredData, 'filteredData');


  return (
    <div className='body'>
      <h1 className='header'>Products</h1>
      <div style={{paddingRight:'2%' }}>
        <div style={{display: 'flex', justifyContent: 'right'}}>
          <input className='search' type='text' placeholder='Search Products' onChange={onSearch} value={searchItem} />
        </div>
      </div>
      <div className='cards-list'>
        {
          filteredData.map((product) => {
            return <Card key={product.id} title={product.title} description={product.description} price={product.price} image={product.thumbnail} />
          }
          )
        }
      </div>
    </div>
  )
}

export default App