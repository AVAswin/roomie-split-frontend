import Navbar from "../components/Navbar";

function MainLayout({ children }) {

    return (

        <div>

            <Navbar />

            <div
                style={{
                    padding: "2rem"
                }}
            >
                {children}
            </div>

        </div>
    );
}

export default MainLayout;