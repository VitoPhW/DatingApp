namespace API.Helpers
{
    public class PaginationHeader
    {
        public int CurrentPage { get; set; }
        public int ItemsPerPage { get; set; }
        public int TptalItems { get; set; }
        public int TotalPages { get; set; }
        public PaginationHeader(int currentPage, int itemsPerPage, int tptalItems, int totalPages)
        {
            TotalPages = totalPages;
            TptalItems = tptalItems;
            ItemsPerPage = itemsPerPage;
            CurrentPage = currentPage;

        }

    }
}