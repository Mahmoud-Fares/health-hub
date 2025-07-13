export const useGoogleCallback = () => {
   const params = new URLSearchParams(window.location.search);

   const isCallback = params.get('callback');
   const token = params.get('token');
   const slug = params.get('slug');
   const role = params.get('role');

   return { isCallback, token, slug, role };
};
