function SummaryCard({
    title,
    value
}) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                minWidth: "200px"
            }}
        >

            <h3>{title}</h3>

            <h2>{value}</h2>

        </div>

    );
}

export default SummaryCard;