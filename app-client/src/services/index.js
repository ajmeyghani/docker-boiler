export default ngModule => {
  ngModule.factory('postService', function($http) {
    return {
      getPosts() {
        return $http.get('/api/posts')
      }
    };
  });
};
