function ContentBox({children}) {

    // container styles
    const BoxStyles = "flex flex-col gap-10 h-[80vh] p-5 bg-gray-100 rounded-md";

    return(
      <div className={BoxStyles}>
        {children}
      </div>  
    );
}

export default ContentBox