export abstract class BaseRepository<Model> {
  protected readonly Model: Model

  constructor (model: Model) {
    this.Model = model
  }
}
