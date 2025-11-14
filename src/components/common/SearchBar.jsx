function SearchBar({value, onChange}) {
    return (<div style={{marginBottom: '1rem'}}>
        <input
            type="text"
            placeholder="Search by brand or model..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
                width: '100%', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #ccc',
            }}
        />
    </div>);
}

export default SearchBar;