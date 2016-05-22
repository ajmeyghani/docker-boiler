describe('pageCtrl instance:', function() {

  var underTest;

  beforeEach(function () {
    helper.appModule('app');
    helper.inject('$controller', '$rootScope', '$q', 'postService');

    sinon.stub(postService, 'getPosts', function () {
      return $q.when({
        data: [{blah: 'blah'}]
      });
    });

    underTest = $controller('pageCtrl', {
      '$scope': $rootScope.$new(),
      'postService': postService
    });

    $rootScope.$apply();
  });

  afterEach(function () {
    postService.getPosts.restore();
  });

  it('should have its `hello` property set. value is.', function() {
    expect(underTest.hello).to.exist;
  });

  it('should have the `posts` field set with bunch of data', function () {
    // expect(mockpostService.getPosts).toHaveBeenCalled();
    expect(underTest.posts).to.deep.equal([{blah: 'blah'}]);
    // expect(underTest.posts.length).toBe(1);
    // expect(mockpostService.getPosts.calls.count()).toBe(1);
  });

});
