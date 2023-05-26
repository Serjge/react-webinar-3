import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import usePagination from "src/hooks/use-pagination";
import './style.css'

function Pagination({totalPages, currentPage, setCurrentPage}) {
  const cn = bem('Pagination');

  const {page, setPage, gaps} = usePagination(totalPages, currentPage);
  const {after, before, paginationGroup} = gaps;

  const onPageClick = (numberPage) => {
    setPage(numberPage);
    setCurrentPage(numberPage)
  };

  return (
    <div className={cn()}>
      <span className={cn('button', {active: page === 1})}
            onClick={page !== 1 ? () => onPageClick(1) : null}>{1}</span>
      {before ? <span className={cn('dot')}>...</span> : null}

      {paginationGroup.map(item => {
        return <span key={item} className={cn('button', {active: page === item})}
                     onClick={page !== item ? () => onPageClick(item) : null}>{item}</span>
      })}

      {after ? <span className={cn('dot')}>...</span> : null}
      <span className={cn('button', {active: page === totalPages})}
            onClick={page !== totalPages ? () => onPageClick(totalPages) : null}>{totalPages}</span>
    </div>
  )
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired, // Обяхательное свойство - функция
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
}

Pagination.defaultProps = {
  totalPages: 0,// Значение по умолчанию
  currentPage: 1,
}

export default React.memo(Pagination);
