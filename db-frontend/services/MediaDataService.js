import http from '../src/http-common'

class MediaDataService {
  getAll(params) {
    return http.get('/media', { params })
  }

  getSingle(id) {
    return http.get(`/media/${id}`)
  }

  store(data) {
    return http.post('/media', data)
  }

  update(id, data) {
    return http.put(`/media/${id}`, data)
  }

  delete(id) {
    return http.delete(`/media/${id}`)
  }
}

export default new MediaDataService()
