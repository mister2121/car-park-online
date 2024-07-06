import { Link } from "react-router-dom"

const Header = ({ parkingCount, setSearchInput, searchInput }) => {
    return (
        <div className='parkings-header-container'>
            <div className='parking-count'>
                <h2>You have {parkingCount} parkings</h2>
            </div>
            <div className='parkings-bttns-container'>
                <div>
                    <input
                        type='search'
                        name='parking-search'
                        className='parking-search'
                        placeholder='Search by name'
                        onChange={ev => setSearchInput(ev.target.value)}
                        value={searchInput}></input>
                </div>
                <div className='link-wrap'>
                    <Link className='parking-add-bttn' to={"/parkings/new"}>
                        Add new parking
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header