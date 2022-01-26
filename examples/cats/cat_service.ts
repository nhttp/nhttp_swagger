export default class CatService {
  findAll() {
    return "Success findall cat";
  }

  findById(id: number) {
    return "Success find " + id + " cat";
  }

  save() {
    return "Success save cat";
  }
}
