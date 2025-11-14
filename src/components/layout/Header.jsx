import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useCart} from '../../context/CartContext.jsx';

function Header() {
    const {count} = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const isDetails = location.pathname.startsWith('/product/');

    const handleTitleClick = (event) => {
        event.preventDefault();
        if (isDetails && window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate('/');
    };

    return (<header
        style={{
            backgroundColor: '#e3f2fd',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1rem',
        }}
    >
        <div>
            {}
            <Link
                to="/"
                onClick={handleTitleClick}
                style={{textDecoration: 'none', fontWeight: 'bold', cursor: 'pointer'}}
            >
                ITX Mobile Shop
            </Link>
            <span style={{marginLeft: '1rem', fontSize: '0.9rem'}}>
          {isDetails ? ' / Product details' : ' / Product list'}
        </span>
        </div>
        <div>
            Cart: <strong>{count}</strong>
        </div>
    </header>);
}

export default Header;