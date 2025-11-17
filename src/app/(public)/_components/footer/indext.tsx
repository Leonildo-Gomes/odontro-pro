
export function Footer() {
    return (
        <footer className="bg-gray-50 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-sm text-gray-500 text-center md:text-base">
                    &copy; {new Date().getFullYear()} Todos os direitos reservados - <span className="hover:text-black duration-300">@Leonildo Gomes</span>  
                
                </p>
            </div>
        </footer>
    );
}