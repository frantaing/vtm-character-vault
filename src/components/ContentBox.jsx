function ContentBox({children}) {

    // container styles
    const BoxStyles = "overflow-x-hidden flex flex-col gap-10 h-[80vh] p-5 bg-gray-100 rounded-md";

    return(
      <div className={BoxStyles}>
        <div className="overflow-y-scroll">
          {children}          
        </div>

      </div>  
    );
}

export default ContentBox